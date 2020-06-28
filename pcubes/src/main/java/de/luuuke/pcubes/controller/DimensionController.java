package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.*;
import de.luuuke.pcubes.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/dimensions")
public class DimensionController extends BasicController<Dimension> {

  private final ValueGroupNumberRepository valueGroupNumberRepository;
  private final ValueGroupCategoricalRepository valueGroupCategoricalRepository;
  private final ValueGroupDateRepository valueGroupDateRepository;
  private final DimensionAttributeRepository dimensionAttributeRepository;
  private final DimensionElementRepository dimensionElementRepository;
  private final DimensionElementValueRepository dimensionElementValueRepository;

  @Autowired
  public DimensionController(DimensionRepository repository,
                             ValueGroupNumberRepository valueGroupNumberRepository,
                             ValueGroupCategoricalRepository valueGroupCategoricalRepository,
                             ValueGroupDateRepository valueGroupDateRepository,
                             DimensionAttributeRepository dimensionAttributeRepository,
                             DimensionElementRepository dimensionElementRepository, DimensionElementValueRepository dimensionElementValueRepository) {
    super(repository);
    this.valueGroupNumberRepository = valueGroupNumberRepository;
    this.valueGroupCategoricalRepository = valueGroupCategoricalRepository;
    this.valueGroupDateRepository = valueGroupDateRepository;
    this.dimensionAttributeRepository = dimensionAttributeRepository;
    this.dimensionElementRepository = dimensionElementRepository;
    this.dimensionElementValueRepository = dimensionElementValueRepository;
  }

  @PostMapping("/{dimId}/attributes")
  public ResponseEntity<DimensionAttribute> addAttribute(@PathVariable Long dimId, @RequestBody DimensionAttribute attribute) {
    Optional<Dimension> dimension = this.getRepository().findById(dimId);
    if (dimension.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    DimensionAttribute dimensionAttribute = new DimensionAttribute(
        attribute.getName(),
        attribute.getDtype(),
        dimension.get());

    DimensionAttribute saved = dimensionAttributeRepository.save(dimensionAttribute);

    return ResponseEntity.ok(saved);
  }

  @PostMapping("/{dimId}/elements")
  public ResponseEntity<DimensionElement> addElement(@PathVariable Long dimId, @RequestBody Map<Long, Long> attributeValueMappings) {
    Optional<Dimension> dimension = this.getRepository().findById(dimId);
    if (dimension.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Iterable<DimensionAttribute> attributes = dimensionAttributeRepository.findAllById(attributeValueMappings.keySet());

    DimensionElement dimensionElement = new DimensionElement();
    dimensionElement.setDimension(dimension.get());

    for (DimensionAttribute attribute : attributes) {
      Long valueId = attributeValueMappings.get(attribute.getId());

      Optional<? extends ValueGroup> value = Optional.empty();
      switch (attribute.getDtype()) {
        case "str":
          value = valueGroupCategoricalRepository.findById(valueId);
          break;
        case "float":
          value = valueGroupNumberRepository.findById(valueId);
          break;
        case "date":
          value = valueGroupDateRepository.findById(valueId);
          break;
      }

      if (value.isEmpty()) {
        return ResponseEntity.notFound().build();
      }

      DimensionElementValue dimensionElementValue = new DimensionElementValue(attribute, value.get());
      dimensionElementValue = dimensionElementValueRepository.save(dimensionElementValue);
      dimensionElement.addValue(dimensionElementValue);
    }

    DimensionElement saved = dimensionElementRepository.save(dimensionElement);

    return ResponseEntity.ok(saved);
  }

  @DeleteMapping("/{dimId}/elements/{elementId}")
  public ResponseEntity<DimensionElement> deleteElement(@PathVariable Long dimId, @PathVariable Long elementId) {
    dimensionElementRepository.deleteById(elementId);
    return ResponseEntity.noContent().build();
  }
}

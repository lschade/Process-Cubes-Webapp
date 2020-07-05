package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.cube.structure.AttributeValue;
import de.luuuke.pcubes.models.cube.structure.Dimension;
import de.luuuke.pcubes.models.cube.structure.DimensionAttribute;
import de.luuuke.pcubes.models.cube.structure.DimensionElement;
import de.luuuke.pcubes.models.cube.structure.DimensionElementValue;
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

  private final AttributeValueNumberRepository attributeValueNumberRepository;
  private final AttributeValueCategoricalRepository attributeValueCategoricalRepository;
  private final AttributeValueDateRepository attributeValueDateRepository;
  private final DimensionAttributeRepository dimensionAttributeRepository;
  private final DimensionElementRepository dimensionElementRepository;
  private final DimensionElementValueRepository dimensionElementValueRepository;

  @Autowired
  public DimensionController(DimensionRepository repository,
                             AttributeValueNumberRepository attributeValueNumberRepository,
                             AttributeValueCategoricalRepository attributeValueCategoricalRepository,
                             AttributeValueDateRepository attributeValueDateRepository,
                             DimensionAttributeRepository dimensionAttributeRepository,
                             DimensionElementRepository dimensionElementRepository, DimensionElementValueRepository dimensionElementValueRepository) {
    super(repository);
    this.attributeValueNumberRepository = attributeValueNumberRepository;
    this.attributeValueCategoricalRepository = attributeValueCategoricalRepository;
    this.attributeValueDateRepository = attributeValueDateRepository;
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
        attribute.getDataType(),
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
    dimensionElement = dimensionElementRepository.save(dimensionElement);

    for (DimensionAttribute attribute : attributes) {
      Long valueId = attributeValueMappings.get(attribute.getId());

      Optional<? extends AttributeValue> value = Optional.empty();
      switch (attribute.getDataType()) {
        case CATEGORICAL:
          value = attributeValueCategoricalRepository.findById(valueId);
          break;
        case NUMBER:
          value = attributeValueNumberRepository.findById(valueId);
          break;
        case DATE:
          value = attributeValueDateRepository.findById(valueId);
          break;
      }

      if (value.isEmpty()) {
        return ResponseEntity.notFound().build();
      }

      DimensionElementValue dimensionElementValue = new DimensionElementValue(dimensionElement, attribute, value.get());
      dimensionElementValue = dimensionElementValueRepository.save(dimensionElementValue);
      dimensionElement.addValue(dimensionElementValue);
    }

    return ResponseEntity.ok(dimensionElement);
  }

  @DeleteMapping("/{dimId}/elements/{elementId}")
  public ResponseEntity<DimensionElement> deleteElement(@PathVariable Long dimId, @PathVariable Long elementId) {
    dimensionElementRepository.deleteById(elementId);
    return ResponseEntity.noContent().build();
  }
}

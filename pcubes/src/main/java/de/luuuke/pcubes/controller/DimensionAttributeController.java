package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.DimensionAttribute;
import de.luuuke.pcubes.models.DimensionElementValue;
import de.luuuke.pcubes.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/dimension_attribute")
public class DimensionAttributeController extends BasicController<DimensionAttribute> {

  private final AttributeValueNumberRepository attributeValueNumberRepository;
  private final AttributeValueCategoricalRepository attributeValueCategoricalRepository;
  private final AttributeValueDateRepository attributeValueDateRepository;
  private final DimensionAttributeRepository dimensionAttributeRepository;
  private final DimensionElementValueRepository dimensionElementValueRepository;

  @Autowired
  public DimensionAttributeController(
      AttributeValueNumberRepository attributeValueNumberRepository,
      AttributeValueCategoricalRepository attributeValueCategoricalRepository,
      AttributeValueDateRepository attributeValueDateRepository,
      DimensionAttributeRepository dimensionAttributeRepository,
      CrudRepository<DimensionAttribute, Long> repository, DimensionElementValueRepository dimensionElementValueRepository) {
    super(repository);

    this.attributeValueNumberRepository = attributeValueNumberRepository;
    this.attributeValueCategoricalRepository = attributeValueCategoricalRepository;
    this.attributeValueDateRepository = attributeValueDateRepository;
    this.dimensionAttributeRepository = dimensionAttributeRepository;
    this.dimensionElementValueRepository = dimensionElementValueRepository;
  }

  @GetMapping("")
  @Override
  public ResponseEntity<Iterable<DimensionAttribute>> getAll() {
    return ResponseEntity.ok(dimensionAttributeRepository.findAllByOrderByCreatedAtAsc());
  }

  @DeleteMapping("{id}")
  @Override
  public ResponseEntity<DimensionAttribute> delete(@PathVariable Long id) {
    Optional<DimensionAttribute> attribute = dimensionAttributeRepository.findById(id);
    if (attribute.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Iterable<DimensionElementValue> byDimensionAttribute = dimensionElementValueRepository.findAllByDimensionAttribute(attribute.get());
    dimensionElementValueRepository.deleteAll(byDimensionAttribute);

    dimensionAttributeRepository.delete(attribute.get());

    return ResponseEntity.ok().build();
  }


}

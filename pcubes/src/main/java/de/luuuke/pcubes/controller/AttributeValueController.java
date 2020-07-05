package de.luuuke.pcubes.controller;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import de.luuuke.pcubes.models.cube.structure.AttributeValueCategorical;
import de.luuuke.pcubes.models.cube.structure.AttributeValueDate;
import de.luuuke.pcubes.models.cube.structure.AttributeValueNumber;
import de.luuuke.pcubes.models.cube.structure.DimensionAttribute;
import de.luuuke.pcubes.repositories.AttributeValueCategoricalRepository;
import de.luuuke.pcubes.repositories.AttributeValueDateRepository;
import de.luuuke.pcubes.repositories.AttributeValueNumberRepository;
import de.luuuke.pcubes.repositories.DimensionAttributeRepository;

@Controller
@RequestMapping("attribute_value")
public class AttributeValueController {

  private final AttributeValueNumberRepository attributeValueNumberRepository;
  private final AttributeValueCategoricalRepository attributeValueCategoricalRepository;
  private final AttributeValueDateRepository attributeValueDateRepository;
  private final DimensionAttributeRepository dimensionAttributeRepository;


  @Autowired
  public AttributeValueController(AttributeValueNumberRepository attributeValueNumberRepository,
                                  AttributeValueCategoricalRepository attributeValueCategoricalRepository,
                                  AttributeValueDateRepository attributeValueDateRepository,
                                  DimensionAttributeRepository dimensionAttributeRepository) {
    this.attributeValueNumberRepository = attributeValueNumberRepository;
    this.attributeValueCategoricalRepository = attributeValueCategoricalRepository;
    this.attributeValueDateRepository = attributeValueDateRepository;
    this.dimensionAttributeRepository = dimensionAttributeRepository;
  }

  @PostMapping("{attrId}/number")
  public ResponseEntity<AttributeValueNumber> addVGroupNumber(@PathVariable Long attrId,
                                                              @RequestBody AttributeValueNumber attributeValueNumber) {
    Optional<DimensionAttribute> attribute = dimensionAttributeRepository.findById(attrId);
    if (attribute.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Set<AttributeValueNumber> allByLowerAndUpper = attributeValueNumberRepository.findAllByLowerAndUpper(attributeValueNumber.getLower(), attributeValueNumber.getUpper());
    if (!allByLowerAndUpper.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    attributeValueNumber = new AttributeValueNumber(attribute.get(), attributeValueNumber.getLower(), attributeValueNumber.getUpper());
    AttributeValueNumber saved = attributeValueNumberRepository.save(attributeValueNumber);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("{attrId}/categorical")
  public ResponseEntity<AttributeValueCategorical> addVGroupCategorical(@PathVariable Long attrId,
                                                                        @RequestBody AttributeValueCategorical attributeValueCategorical) {
    Optional<DimensionAttribute> attribute = dimensionAttributeRepository.findById(attrId);
    if (attribute.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    attributeValueCategorical = new AttributeValueCategorical(attribute.get(), attributeValueCategorical.getValues());
    AttributeValueCategorical saved = attributeValueCategoricalRepository.save(attributeValueCategorical);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("{attrId}/date")
  public ResponseEntity<AttributeValueDate> addVGroupDate(@PathVariable Long attrId,
                                                          @RequestBody AttributeValueDate attributeValueDate) {
    Optional<DimensionAttribute> attribute = dimensionAttributeRepository.findById(attrId);
    if (attribute.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    attributeValueDate = new AttributeValueDate(attribute.get(), attributeValueDate.getStartDate(), attributeValueDate.getEndDate());
    AttributeValueDate saved = attributeValueDateRepository.save(attributeValueDate);
    return ResponseEntity.ok(saved);
  }
}

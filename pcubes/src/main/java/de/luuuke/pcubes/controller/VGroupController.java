package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.AttributeValueCategorical;
import de.luuuke.pcubes.models.AttributeValueDate;
import de.luuuke.pcubes.models.AttributeValueNumber;
import de.luuuke.pcubes.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class VGroupController {

  private final AttributeValueNumberRepository attributeValueNumberRepository;
  private final AttributeValueCategoricalRepository attributeValueCategoricalRepository;
  private final AttributeValueDateRepository attributeValueDateRepository;


  @Autowired
  public VGroupController(AttributeValueNumberRepository attributeValueNumberRepository,
                          AttributeValueCategoricalRepository attributeValueCategoricalRepository,
                          AttributeValueDateRepository attributeValueDateRepository) {
    this.attributeValueNumberRepository = attributeValueNumberRepository;
    this.attributeValueCategoricalRepository = attributeValueCategoricalRepository;
    this.attributeValueDateRepository = attributeValueDateRepository;
  }

  @PostMapping("vgroup_number")
  public ResponseEntity<AttributeValueNumber> addVGroupNumber(AttributeValueNumber attributeValueNumber) {
    AttributeValueNumber saved = attributeValueNumberRepository.save(attributeValueNumber);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("vgroup_categorical")
  public ResponseEntity<AttributeValueCategorical> addVGroupCategorical(AttributeValueCategorical attributeValueCategorical) {
    AttributeValueCategorical saved = attributeValueCategoricalRepository.save(attributeValueCategorical);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("vgroup_date")
  public ResponseEntity<AttributeValueDate> addVGroupDate(AttributeValueDate attributeValueDate) {
    AttributeValueDate saved = attributeValueDateRepository.save(attributeValueDate);
    return ResponseEntity.ok(saved);
  }
}

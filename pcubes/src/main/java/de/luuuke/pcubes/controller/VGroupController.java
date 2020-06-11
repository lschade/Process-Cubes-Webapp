package de.luuuke.pcubes.controller;

import de.luuuke.pcubes.models.ValueGroupCategorical;
import de.luuuke.pcubes.models.ValueGroupDate;
import de.luuuke.pcubes.models.ValueGroupNumber;
import de.luuuke.pcubes.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class VGroupController {

  private ValueGroupNumberRepository valueGroupNumberRepository;
  private ValueGroupCategoricalRepository valueGroupCategoricalRepository;
  private ValueGroupDateRepository valueGroupDateRepository;
  private ValueGroupRepository valueGroupRepository;
  private DimensionAttributeRepository dimensionAttributeRepository;


  @Autowired
  public VGroupController(ValueGroupNumberRepository valueGroupNumberRepository,
                          ValueGroupCategoricalRepository valueGroupCategoricalRepository,
                          ValueGroupDateRepository valueGroupDateRepository,
                          ValueGroupRepository valueGroupRepository,
                          DimensionAttributeRepository dimensionAttributeRepository) {
    this.valueGroupNumberRepository = valueGroupNumberRepository;
    this.valueGroupCategoricalRepository = valueGroupCategoricalRepository;
    this.valueGroupDateRepository = valueGroupDateRepository;
    this.valueGroupRepository = valueGroupRepository;
    this.dimensionAttributeRepository = dimensionAttributeRepository;
  }

  @PostMapping("vgroup_number")
  public ResponseEntity<ValueGroupNumber> addVGroupNumber(ValueGroupNumber valueGroupNumber) {
    ValueGroupNumber saved = valueGroupNumberRepository.save(valueGroupNumber);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("vgroup_categorical")
  public ResponseEntity<ValueGroupCategorical> addVGroupCategorical(ValueGroupCategorical valueGroupCategorical) {
    ValueGroupCategorical saved = valueGroupCategoricalRepository.save(valueGroupCategorical);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("vgroup_date")
  public ResponseEntity<ValueGroupDate> addVGroupDate(ValueGroupDate valueGroupDate) {
    ValueGroupDate saved = valueGroupDateRepository.save(valueGroupDate);
    return ResponseEntity.ok(saved);
  }
}

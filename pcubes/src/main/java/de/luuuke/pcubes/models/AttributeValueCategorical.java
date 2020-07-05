package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class AttributeValueCategorical extends AttributeValue {

  @ElementCollection
  @CollectionTable(name = "attribute_value_categorical_values", joinColumns = @JoinColumn(name = "attribute_value_id"))
  @Column(name = "value_set")
  private Set<String> values;

  public AttributeValueCategorical() {
  }

  public AttributeValueCategorical(DimensionAttribute attribute, Set<String> values) {
    super(attribute);
    this.values = values;
  }

  public Set<String> getValues() {
    return values;
  }
}

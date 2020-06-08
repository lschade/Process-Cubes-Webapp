package de.luuuke.pcubes.models;

import javax.persistence.*;
import java.util.Set;

@Entity
public class ValueGroupCategorical extends ValueGroup {

  @ElementCollection
  @CollectionTable(name = "value_group_categorical_values", joinColumns = @JoinColumn(name = "value_group_id"))
  @Column(name = "vgroup_values")
  private Set<String> values;

  public Set<String> getValues() {
    return values;
  }
}

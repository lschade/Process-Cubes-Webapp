package de.luuuke.pcubes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ProcessCubeStructure {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @OneToMany
  private List<Dimension> dimensions = new ArrayList<>();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public List<Dimension> getDimensions() {
    return dimensions;
  }
}
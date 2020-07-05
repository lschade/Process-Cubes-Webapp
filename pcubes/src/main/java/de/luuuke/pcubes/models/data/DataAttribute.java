package de.luuuke.pcubes.models.cube.mapping;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import de.luuuke.pcubes.models.BaseEntity;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class DataAttribute extends BaseEntity {

  private String name;

  public abstract String getPath();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

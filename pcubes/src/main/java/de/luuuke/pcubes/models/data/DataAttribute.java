package de.luuuke.pcubes.models.data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import de.luuuke.pcubes.models.BaseEntity;
import de.luuuke.pcubes.models.DataType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class DataAttribute extends BaseEntity {

  private String name;

  @Enumerated(EnumType.STRING)
  private DataType dataType;

  public abstract String getPath();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public DataType getDataType() {
    return dataType;
  }
}

package de.luuuke.pcubes.models.data;

import de.luuuke.pcubes.models.BaseEntity;
import jakarta.persistence.Entity;

import java.util.Set;

@Entity
public abstract class DataFile extends BaseEntity {

  private String fileName;

  public abstract Set<? extends DataAttribute> getAttributes();

}

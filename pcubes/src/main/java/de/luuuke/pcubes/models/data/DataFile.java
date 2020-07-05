package de.luuuke.pcubes.models.data;

import java.util.Set;

import de.luuuke.pcubes.models.BaseEntity;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public abstract class DataFile extends BaseEntity {

  private String fileName;

  public abstract Set<? extends DataAttribute> getAttributes();

}

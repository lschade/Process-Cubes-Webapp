package de.luuuke.pcubes.models.data;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class CSVFile extends DataFile {

  @OneToMany
  private Set<CSVDataAttribute> columns;

  @Override
  public Set<CSVDataAttribute> getAttributes() {
    return this.columns;
  }
}

package de.luuuke.pcubes.models.data;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.Set;

@Entity
public class CSVFile extends DataFile {

  @OneToMany
  private Set<CSVDataAttribute> columns;

  @Override
  public Set<CSVDataAttribute> getAttributes() {
    return this.columns;
  }
}

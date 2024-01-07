package de.luuuke.pcubes.models.data;

import jakarta.persistence.Entity;

@Entity
public class CSVDataAttribute extends DataAttribute {

  private String columnName;

  @Override
  public String getPath() {
    return this.columnName;
  }

  public String getColumnName() {
    return columnName;
  }

  public void setColumnName(String columnName) {
    this.columnName = columnName;
  }
}

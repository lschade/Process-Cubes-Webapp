package de.luuuke.pcubes.models.cube.mapping;

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

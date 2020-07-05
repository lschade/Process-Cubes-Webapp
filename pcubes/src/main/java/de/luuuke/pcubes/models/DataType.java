package de.luuuke.pcubes.models;

public enum DataType {
  DATE("date"), NUMBER("float"), CATEGORICAL("str"), BOOLEAN("bool");

  private String name;

  DataType(String name) {

  }
}

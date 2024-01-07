package de.luuuke.pcubes.models.cube.structure;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;

import java.util.Date;

@Entity
public class AttributeValueDate extends AttributeValue {

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  private Date startDate;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  private Date endDate;

  public AttributeValueDate() {
  }

  public AttributeValueDate(DimensionAttribute attribute, Date startDate, Date endDate) {
    super(attribute);
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public Date getStartDate() {
    return startDate;
  }

  public Date getEndDate() {
    return endDate;
  }
}
package de.luuuke.pcubes.models;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class ValueGroupDate extends ValueGroup {

  private Date startDate;

  private Date endDate;

  public Date getStartDate() {
    return startDate;
  }

  public Date getEndDate() {
    return endDate;
  }
}
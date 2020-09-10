from django.db import models


class EventLog(models.Model):
    name = models.CharField(max_length=255)


class EventBase(models.Model):
    event_logs = models.ManyToManyField(to=EventLog)


class EventLogAttribute(models.Model):
    log = models.ForeignKey(to=EventLog, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    case_attribute = models.BooleanField()
    db_query = models.CharField(max_length=255)



# Generated by Django 2.2.4 on 2019-08-09 20:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('event_log', '__first__'),
        ('process_cube', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProcessCubeView',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('case_level', models.BooleanField()),
                ('pcs', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='process_cube.ProcessCubeStructure')),
            ],
        ),
        migrations.CreateModel(
            name='VisibleDimension',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dimension', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='process_cube.Dimension')),
                ('pcv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visible_dimensions', to='process_cube_view.ProcessCubeView')),
            ],
        ),
        migrations.CreateModel(
            name='Mapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='process_cube.DimensionAttribute')),
                ('e_attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='event_log.EventLogAttribute')),
                ('pcv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mappings', to='process_cube_view.ProcessCubeView')),
            ],
            options={
                'unique_together': {('e_attribute', 'd_attribute', 'pcv')},
            },
        ),
    ]
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AlmacenadoJuego(models.Model):
    id_juego_almacenado = models.AutoField(primary_key=True)
    id_juego = models.ForeignKey('Juego', models.DO_NOTHING, db_column='id_juego')
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    nombre_juego = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    puntuacion = models.DecimalField(max_digits=10, decimal_places=0)
    veces_pasado = models.IntegerField(blank=True, null=True)
    fecha_de_finalizacion = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'almacenado_juego'


class Juego(models.Model):
    id_juego = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'juego'


class RolUsuario(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'rol_usuario'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=100)
    nick = models.CharField(max_length=50)
    mail = models.CharField(max_length=256)
    contraseña = models.CharField(max_length=3000)
    descripcion = models.CharField(max_length=3000, blank=True, null=True)
    img_perfil = models.CharField(max_length=500, blank=True, null=True)
    img_banner = models.CharField(max_length=500, blank=True, null=True)
    session_token = models.CharField(max_length=3000)
    id_rol = models.ForeignKey(RolUsuario, models.DO_NOTHING, db_column='id_rol')

    class Meta:
        managed = False
        db_table = 'usuario'

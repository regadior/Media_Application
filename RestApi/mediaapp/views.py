import json
from .models import *
from django.core.validators import MaxLengthValidator  #Funcion para comprobar la longitud
import re #Módulo de Python que proporciona soporte para expresiones regulares
import jwt
import logging
import hashlib
from django.db.models import Avg
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict

# Create your views here.


#FUNCION PARAA HASHEAR LA CONTRASEÑA
def hash_password(pass1):
    return hashlib.sha256(pass1.encode()).hexdigest()

#FUNCION QUE GENERA UN TOKEN DE SESION
def generate_token(usuario):
    payload = {
        'user_id': usuario.id_usuario,
        'username': usuario.nick
    }
    secret = 'secreto'
    token = jwt.encode(payload, secret, algorithm='HS256')
    token = token.decode('utf-8')
    return token

#VISTA PARA REGISTRAR A UN USUARIO AL ENDPOINT http://localhost:8000/api/register/
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        apell = data.get('apell')
        nick = data.get('nick')
        email = data.get('email')
        pass1 = data.get('pass1')
        pass2 = data.get('pass2')

        # Comprobar que todos los campos esten completos
        if not all([nombre, apell, apell, nick, email, pass1, pass2]):
            return JsonResponse({'error': 'Faltan parámetros (campos incompletos)'}, status=400)

        # COMPROBAR QUE EL NOMBRE TIENE DE 3 A 25 DIGITOS
        if not(3<= len(nombre)<= 25):
            return JsonResponse({'error': 'El campo Nombre debe tener entre 3 y 25 digitos'}, status=400)
        
        # COMPROBAR QUE EL APELLIDO ESTE ENTRE 2Y 25 CARACTERES"
        if not (2<= len(apell)<= 25):
            return JsonResponse({'error': 'El campo Apellido debe tener entre 2 y 25 digitos'}, status=400)

        # COMPROBAR QUE EL NOMBRE DE USUARIO TIENE DE 3 A 20 DIGITOS
        if not(3<= len(nick)<= 20):
            return JsonResponse({'error': 'El campo Nombre de usuario debe tener entre 1 y 20 digitos'}, status=400)

        # COMPROBAR QUE EL EMAIL ES VÁLIDO
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return JsonResponse({'error': 'El correo electrónico es inválido'}, status=400)
        
        # Comprobamos que las contraseñas coinciden
        if pass1 != pass2:
            return JsonResponse({'error': 'Las contraseñas no coinciden'}, status=400)
        
        # COMPROBAR QUE LA CONTRASEÑA DE USUARIO TIENE DE 5 A 20 DIGITOS
        if not(5<= len(pass1)<= 20):
            return JsonResponse({'error': 'El campo Contraseña de usuario debe tener entre 5 y 20 digitos'}, status=400)

        # Comprobamos que el usuario no exista ya en la base de datos
        if Usuario.objects.filter(nick=nick).exists():
            return JsonResponse({'error': 'El usuario con este nombre de usuario ya existe'}, status=409)

        #Comprobamos que el correo no exista ya en la base de datos
        if Usuario.objects.filter(mail=email).exists():
            return JsonResponse({'error': 'El usuario con este correo ya existe'}, status=409)

        # Crear el usuario
        hashed_password = hash_password(pass1)
        rol_usuario = RolUsuario.objects.get(id_rol=3)
        usuario = Usuario(nombre=nombre, apellido=apell, nick=nick, mail=email, contraseña=hashed_password, descripcion="Escribe aqui tu descripción",id_rol=rol_usuario)#el rol por defecto de usuer normal es el 3
        usuario.save()
        #RESPONDE UN 20OK
        return JsonResponse({'OK': 'El usuario registrado correctamente'}, status=200)
    return HttpResponse(status=405)

#VISTA PARA INICIAR SESION DE UN USUARIO AL ENDPOINT http://localhost:8000/api/login/
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nick = data.get('nick')
        pass1 = data.get('pass1')
        try:
            #SE COMPRUEBA QUE EL USUARIO EXISTA SEGUN SU NOMBRE DE USUARIO
            usuario = Usuario.objects.get(nick=nick)
            #SE COMPRUBA QUE LA CONTRASEÑA ALMACENADA ES IGUAL A LA INTRODUCIDA
            if hash_password(pass1) == usuario.contraseña:
                usuario.session_token = generate_token(usuario)
                usuario.save()
            usuario.save()
            #ENVIA EL TOKEN DE SESION CON UN 200 OK EN UN JSON
            return JsonResponse({'session_token': usuario.session_token}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'La contraseña o el usuario no existen'}, status=400)
    return HttpResponse(status=405)




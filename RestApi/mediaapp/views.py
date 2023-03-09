import json
import jwt
import logging
import hashlib
from django.db.models import Avg
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from .models import *
from django.forms.models import model_to_dict

# Create your views here.


#VISTA PARA REGISTRAR A UN USUARIO A LA URL 
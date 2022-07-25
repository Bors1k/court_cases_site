from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework import status
from .serializers import ChangePasswordSerializer, CourtCasesSerializer, CustomUserSerializer, NotifyTasksSerializer
from .models import CustomUser, CourtCases, NotifyTask
from .tasks import create_task
from django.contrib.auth.hashers import make_password

# from .tasks import add as _add

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_users(request):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer(queryset, many=True)
    
    return Response(serializer_class.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_current_user_info(request):
    user = request.user
    queryset = CustomUser.objects.get(id=user.id)
    serializer_class = CustomUserSerializer(queryset, many=False)

    return Response({"userInfo": serializer_class.data, "fio": str(user)})

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_password(request):
    user = request.user
    data = request.data
    
    serializer = CustomUserSerializer(user, many=False)

    user.password = make_password(data['password'])
    user.save()

    return Response({'status': 'password set', 'userInfo': serializer.data }, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_user_by_id(request, pk):
    queryset = CustomUser.objects.get(id=pk)
    serializer_class = CustomUserSerializer(queryset, many=False)
    
    return Response(serializer_class.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_courts(request):
    user = request.user
    
    ordering = request.query_params.get('ordering')

    # _add.delay(4,4)
    if user.is_admin:
        queryset = CourtCases.objects.all()
    else:
        queryset = CourtCases.objects.filter(user_id=user.id)

    if ordering is not None and ordering == 'reverse':
        queryset = queryset.order_by('number_of_court').reverse()
    else:
        queryset = queryset.order_by('number_of_court')
        
    serializer_class = CourtCasesSerializer(queryset, many=True)

    return Response(serializer_class.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_notifies_for_court(request, pk):
    user = request.user
    
    # _add.delay(4,4)
    if user.is_admin or user.is_chief:
        queryset = NotifyTask.objects.filter(court_id = pk)
    else:
        content = {'detail': 'You have no permissions to this court'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    serializer_class = NotifyTasksSerializer(queryset, many=True)

    return Response(serializer_class.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_court_details(request, pk):
    user = request.user

    queryset = CourtCases.objects.get(id=pk)

    serializer_class = CourtCasesSerializer(queryset, many=False)

    if user.is_admin is False and serializer_class.data['user_id'] != user.id:
        content = {'detail': 'You have no permissions to this court'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    return Response(serializer_class.data)

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data
    
    print(data)

    serializer_class = CustomUserSerializer(user, many=False)
    
    for field in data:
        setattr(user, str(field), data[str(field)])
    
    user.save()

    return Response(serializer_class.data)

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_court(request, pk):
    user = request.user
    data = request.data
    print(data)

    court = CourtCases.objects.get(id=pk)
    serializer_class = CourtCasesSerializer(court, many=False)
    
    if user.is_admin is False and serializer_class.data['user_id'] != user.id:
        content = {'detail': 'You have no permissions to this court'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        for field in data:
            setattr(court, str(field), data[str(field)])

        court.save()

        create_task.delay(court.id)

        serializer_class = CourtCasesSerializer(court, many=False)

        return Response(serializer_class.data)
    
@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_court(request):
    user = request.user
    data = request.data

    print({**data, "user_id":user.id})
    
    court = CourtCases.objects.create(**{**data, "user_id":user})

    create_task.delay(court.id)
    
    serializer_class = CourtCasesSerializer(court, many=False)

    return Response(serializer_class.data)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def del_court_by_id(request, pk):
    print(pk)
    user = request.user

    court = CourtCases.objects.get(id=pk)

    serializer_class = CourtCasesSerializer(court, many=False)
    
    if user.is_admin is False and serializer_class.data['user_id'] != user.id:
        content = {'detail': 'You have no permissions to delete this court'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        court.delete()

        return Response("Court was deleted")
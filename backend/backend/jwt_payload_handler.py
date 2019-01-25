def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': {
            'username': user.username, 'id': user.id, 'email': user.email
        }
    }
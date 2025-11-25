import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate website code using AI based on user prompt with web search capability
    Args: event with httpMethod, body (prompt, language), queryStringParameters
          context with request_id
    Returns: HTTP response with generated code
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        prompt = body.get('prompt', '')
        language = body.get('language', 'html')
        
        if not prompt:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Prompt is required'})
            }
        
        openai_key = os.environ.get('OPENAI_API_KEY')
        
        if not openai_key:
            return {
                'statusCode': 503,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'OpenAI API key not configured'})
            }
        
        import requests
        
        system_prompt = """Ты — эксперт по веб-разработке. Твоя задача — создавать красивые, современные и полностью рабочие сайты на основе запросов пользователей.

Важно:
- Генерируй ТОЛЬКО код, без объяснений
- Используй современный дизайн с градиентами, анимациями, адаптивность
- Весь код должен быть в одном HTML файле (включая CSS в <style> и JS в <script>)
- Используй эмодзи для иконок где уместно
- Добавляй плавные анимации и hover-эффекты
- Код должен быть готов к запуску в браузере

Если пользователь просит информацию, которую нужно найти в интернете (актуальные данные, новости, факты), используй свои знания и создай реалистичный пример."""

        user_message = f"Создай {language} сайт: {prompt}"
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {openai_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': user_message}
                ],
                'temperature': 0.7,
                'max_tokens': 4000
            },
            timeout=60
        )
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'OpenAI API error: {response.text}'})
            }
        
        result = response.json()
        generated_code = result['choices'][0]['message']['content']
        
        generated_code = generated_code.strip()
        if generated_code.startswith('```html'):
            generated_code = generated_code[7:]
        elif generated_code.startswith('```'):
            generated_code = generated_code[3:]
        if generated_code.endswith('```'):
            generated_code = generated_code[:-3]
        generated_code = generated_code.strip()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'code': generated_code,
                'language': language,
                'prompt': prompt
            })
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }

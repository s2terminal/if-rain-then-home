## if rain then home
```bash
$ cp .env.example .env
$ docker-compose build
```

### invoke local
```bash
$ docker-compose run --rm app serverless invoke local --function rain
```

### deploy
```
$ docker-compose run --rm app serverless deploy
```

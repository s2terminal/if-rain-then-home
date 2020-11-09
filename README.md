# if rain then home
![image](https://user-images.githubusercontent.com/7953751/98558772-2b0e1680-22e9-11eb-8004-6047b3c48f0e.png)

```bash
$ cp .env.example .env
$ docker-compose build
```

## invoke local
```bash
$ docker-compose run --rm app serverless invoke local --function rain
```

## deploy
```
$ docker-compose run --rm app serverless deploy
```

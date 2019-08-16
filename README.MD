

## start websocket server in terminal A

```bash
node ws-server.js
```

which will listen port `3999`

## start proxy 

```bash
node proxy.js
```

which will 

- listen port `4000` and redirect all tcp package to `ws-server.js`
- log traffic size


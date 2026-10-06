# MetasSemestre

App de metas acadêmicas construído com Expo (React Native), com persistência
local via `AsyncStorage`.

## Funcionalidades

- Cadastro de metas de estudo (`useState` + `Pressable`)
- Remoção de metas (`filter` por `id`)
- Marcar meta como concluída (desafio opcional)
- Contador de pendentes/concluídas no cabeçalho
- Persistência local: os dados sobrevivem ao fechar o app

## Estrutura

```
MetasSemestre/
├── App.js
├── components/
│   ├── MetaInput.js   # TextInput + Pressable de adicionar
│   └── MetaList.js    # FlatList com cada meta (concluir/remover)
└── assets/
    └── icon.png
```

## Onde está a persistência (AsyncStorage)

Ambos os `useEffect` ficam em `App.js`:

- **Carregamento** (linha ~26): `useEffect` com array de dependências
  vazio (`[]`), executado uma única vez quando o componente monta.
  Lê a chave `@metas_semestre` do `AsyncStorage`, faz `JSON.parse` e
  popula o estado `metas` com `setMetas`.

- **Salvamento** (linha ~45): `useEffect` com dependência em `[metas, carregando]`.
  Toda vez que o array `metas` muda (adicionar, remover, concluir),
  o efeito roda novamente e grava `JSON.stringify(metas)` na mesma chave.
  Um `if (carregando) return;` evita sobrescrever o storage com um
  array vazio antes da leitura inicial terminar.

Ambos usam `try/catch` e exibem um `Alert` amigável em caso de erro.

## Como rodar

```bash
npm install
npx expo start
```

## Prints

| Lista vazia | Com itens | Após reabrir o app |
|---|---|---|
| _(./screenshoots/listavazia.png)_ | _(./screenshoots/itens.png)_ | _(./screenshoots/reabrindoapp.png)_ |

## Pull Request

Link do PR: _(cole aqui o link do PR)_
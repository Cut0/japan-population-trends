## 概要

日本の都道府県ごとの人口推移をグラフで見る Web アプリです
(https://japan-population-trends.vercel.app/)

## 環境

開発環境は Node(16.13.0) と yarn を採用しました。
本番環境は Vercel が Node の 14 系までのサポートだったので、14 系を採用しています。

## 使用技術

- Next.js : SSG や　 Vercel 　の親和性を考えて採用しました。都道府県のデータは比較的不変なものであるため build 時に API から結果を取得し、`getStaticProps`で渡しています。
- vanilla-extract : 比較的型安全にスタイリングができる点とビルド時に静的な CSS ファイルが生成されパフォーマンスに期待ができるため採用しました。
- swr : できる限りサーバ − のキャッシュを見せる方針にし、ステート管理を薄くしたかったため採用しました。ただ、今回の規模では useState を利用したローカルステートで管理しても問題なかったかもしれません。
- axios : API との通信に採用しました。fetch API を利用してもよかったのですが、400 番代や 500 番代のエラーが発生した際に Promise を reject しない点や response の受け取り方を比較した際に axios のほうが簡潔なため採用しました。
- recharts : メンテナンスが続いている点とドキュメントが充実している点から採用しました。

## 断念した技術

- MSW : 初期の頃、HTTP 通信をモックするのに採用していました。上記の通り Vercel が　 Node の 14 系までのサポートであり、MSW は 16 系を必要としていたため利用をやめました。

## 構成

- api-client : API との通信を行いレスポンスを整形するフォルダです。
- mock-api-client : api-client のモックです。MSW を利用しなくなったため、非常に薄くなっています。
- src : ページやコンポーネント、Hooks など今回のプロジェクトに直接関係するものを配置してます。

## 利用方法

詳しくは package.json を参照してください。

- `yarn dev` : Next.js を開発モードで起動します。
- `yarn build` : 本番用にビルドします。
- `yarn lint` : eslint と prettier の lint を走らせます。
- `yarn format` : eslint と prettier の format を走らせます。
- `yarn test` : Jest によるテストを実行します。開発では各ビジネスロジックに関するテストを書いています。

適宜、`.env`ファイルの追加をお願いします。構成は以下のとおりです。

```
NEXT_PUBLIC_API_KEY=[resasのAPIKEY]
NEXT_PUBLIC_END_POINT=https://opendata.resas-portal.go.jp/api/v1

```

## 開発フロー

- 機能が完成したら main ブランチにマージするようなトランクベース開発を採用しています。
- main ブランチ向きの PR が作成された際に、GitHub Actions が走り、Vercel からプレビュー用のサイトリンクが発行されます。
- main ブランチに PR がマージされた際に、 Vercel により自動的にデプロイが走ります。

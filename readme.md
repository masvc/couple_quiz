# Couple Quiz 💕

**カップル向けデイリークイズアプリケーション**

パートナーとの絆を深める毎日の質問で、お互いをもっと知り合うことができる Web アプリケーションです。

## ✨ 主な機能

### 🎯 コア機能

- **デイリークイズ**: 毎日新しい質問でパートナーとの理解を深める
- **回答比較**: お互いの回答を比較して共通点や違いを発見
- **AI 相性分析**: 回答データを基にした詳細な相性レポート
- **カップル管理**: カップル登録・ログイン機能

### 🤖 AI 機能

- **AI 質問生成**: カップルの情報を基にした個別最適化質問
- **相性分析**: 回答パターンから算出する詳細な相性スコア
- **地域密着質問**: 住所情報を活用したローカライズ質問

### 📱 UI/UX

- **レスポンシブデザイン**: PC・スマートフォン完全対応
- **美しいグラデーション**: ピンク・パープル系の暖かみのあるデザイン
- **直感的ナビゲーション**: タブ式ナビゲーションでスムーズな操作

## 🏗️ アーキテクチャ

### 技術スタック

**フロントエンド**

- React 18 + TypeScript
- Vite (ビルドツール)
- Tailwind CSS (スタイリング)
- React Router (ルーティング)
- Lucide React (アイコン)
- Zustand (状態管理)

**バックエンド**

- NestJS + TypeScript
- PostgreSQL (データベース)
- TypeORM (ORM)
- OpenAI API (AI 機能)
- Swagger (API ドキュメント)

**開発環境**

- Turbo (Monorepo 管理)
- ESLint + Prettier (コード品質)

### プロジェクト構成

```
couple-quiz/
├── apps/
│   ├── api/          # NestJS API サーバー
│   └── web/          # React フロントエンド
├── database.sql      # データベーススキーマ
├── sample_data.sql   # サンプルデータ
└── turbo.json        # Turbo設定
```

## 🚀 セットアップ

### 前提条件

- Node.js 18 以上
- PostgreSQL 13 以上
- npm または pnpm

### 1. リポジトリクローン

```bash
git clone [repository-url]
cd couple-quiz
```

### 2. 依存関係インストール

```bash
npm install
```

### 3. データベースセットアップ

```bash
# PostgreSQLデータベース作成
createdb couple_quiz

# スキーマ作成
psql couple_quiz < database.sql

# サンプルデータ投入（オプション）
psql couple_quiz < sample_data.sql
```

### 4. 環境変数設定

```bash
# apps/api/.env ファイル作成
cd apps/api
cp .env.example .env

# 必要な環境変数を設定
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/couple_quiz
```

### 5. シーダーデータ投入

```bash
cd apps/api
npm run seed
```

### 6. アプリケーション起動

```bash
# 開発サーバー起動（ルートディレクトリから）
npm run dev
```

## 📱 アクセス先

- **フロントエンド**: http://localhost:5173
- **API サーバー**: http://localhost:3000
- **API ドキュメント**: http://localhost:3000/api/docs

## 🎮 使い方

### 1. カップル登録

1. ランディングページで「はじめる」をクリック
2. 新規カップル登録を選択
3. お二人の基本情報（名前、年齢、住所、交際開始日）を入力

### 2. デイリークイズ

1. ダッシュボードから「今日の質問」を選択
2. 質問に回答してコメントを追加
3. 「回答を送信」でデータ保存

### 3. 回答比較

1. 「回答比較」ページで過去の質問を選択
2. お互いの回答を比較
3. 一致・相違のパターンを確認

### 4. AI 分析

1. 「AI 分析」ページで相性レポートを確認
2. カテゴリ別相性スコアを表示
3. 関係向上のアドバイスを取得

## 🛠️ 開発

### コマンド一覧

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint

# シーダー実行
cd apps/api && npm run seed

# 型チェック
npm run type-check
```

### API エンドポイント

#### ユーザー管理

- `POST /users` - ユーザー作成
- `GET /users` - ユーザー一覧
- `GET /users/:id` - ユーザー詳細

#### カップル管理

- `POST /couples` - カップル作成
- `GET /couples` - カップル一覧
- `GET /couples/:id` - カップル詳細
- `PATCH /couples/:id/increment-day` - 交際日数更新

#### 質問管理

- `POST /questions` - 質問作成
- `GET /questions` - 質問一覧
- `GET /questions/manual` - マニュアル質問一覧
- `GET /questions/couple/:coupleId/today` - 今日の質問取得

#### 回答管理

- `POST /responses` - 回答作成
- `GET /responses` - 回答一覧
- `GET /responses/couple/:coupleId` - カップル別回答
- `GET /responses/couple/:coupleId/question/:questionId` - 特定質問の回答

#### AI 機能

- `POST /ai/generate-question/:coupleId` - AI 質問生成
- `GET /ai/compatibility/:coupleId` - 相性分析

## 🔧 トラブルシューティング

### よくある問題

#### 1. AI 機能でエラーが発生する

```bash
# OpenAI APIキーが正しく設定されているか確認
echo $OPENAI_API_KEY

# .envファイルの設定確認
cat apps/api/.env
```

#### 2. Tailwind CSS が適用されない

```bash
# PostCSS設定確認
cat apps/web/postcss.config.js

# Tailwind設定確認
cat apps/web/tailwind.config.js

# index.cssの@tailwindディレクティブ確認
head -3 apps/web/src/index.css
```

#### 3. データベース接続エラー

```bash
# PostgreSQL接続確認
psql couple_quiz -c "\dt"

# 環境変数確認
echo $DATABASE_URL
```

#### 4. ポート競合エラー

```bash
# ポート使用状況確認
lsof -i :3000  # API
lsof -i :5173  # Web

# プロセス終了
kill -9 [PID]
```

### CSS コメントエラーの修正

`apps/web/src/index.css`で未終了コメントエラーが発生した場合：

```css
/* 修正前 */
/* 既存のCSSはそのまま残す *

/* 修正後 */
/* 既存のCSSはそのまま残す */
```

## 📊 データベーススキーマ

### 主要テーブル

#### users（ユーザー）

- `id`: プライマリーキー
- `name`: 名前
- `age`: 年齢
- `gender`: 性別（male/female）
- `location`: 住所

#### couples（カップル）

- `id`: プライマリーキー
- `male_user_id`: 男性ユーザー ID
- `female_user_id`: 女性ユーザー ID
- `start_date`: 交際開始日
- `current_day`: 現在の交際日数

#### questions（質問）

- `id`: プライマリーキー
- `question_text`: 質問文
- `question_type`: 質問タイプ（manual/ai_generated）
- `category`: カテゴリ
- `ai_context`: AI 生成コンテキスト

#### responses（回答）

- `id`: プライマリーキー
- `couple_id`: カップル ID
- `question_id`: 質問 ID
- `user_id`: ユーザー ID
- `answer`: 回答内容
- `comment`: コメント

## 🚀 デプロイ

### 本番環境セットアップ

1. **環境変数設定**

```bash
# 本番用環境変数
NODE_ENV=production
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
```

2. **ビルド**

```bash
npm run build
```

3. **データベースマイグレーション**

```bash
# TypeORM マイグレーション実行
npm run migration:run
```

## 🤝 コントリビューション

1. フォークしてブランチ作成
2. 機能追加・バグ修正
3. テスト追加
4. プルリクエスト作成

## 📄 ライセンス

MIT License

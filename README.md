This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


食事管理アプリ 要件定義書

1. プロジェクト概要
ユーザーが撮影または保存した「食事の写真」あるいは「テキスト入力」によって、摂取カロリー・PFCバランス（タンパク質・脂質・炭水化物）を自動推定し、日々の食事を記録・分析・管理できるアプリを開発する。

2. 目的
ユーザーが簡単かつ正確に食事内容を記録・分析できる環境を提供
ダイエット・筋トレ・健康維持等、食事改善に向けた行動をサポート
AIによる画像解析・栄養推定技術の活用によるユーザー体験の向上
3. 想定ユーザー
健康意識の高い一般ユーザー
ダイエットや筋トレに取り組む人
食事指導が必要な高齢者・病後者
栄養士・フィットネストレーナーなどの専門職
4. 機能要件
4.1. 食事記録機能

食事画像をアップロードし、AIが画像解析して料理名・量を推定
文字入力でも料理名と量を登録可能（例：「鶏むね肉 150g」）
選択リストから手動で食品名を選択するモードも提供
4.2. 栄養素自動解析

食事の写真または文字入力により、以下を自動算出：
カロリー
P（タンパク質）
F（脂質）
C（炭水化物）
データベース連携（文部科学省食品成分データベース等）で栄養情報を取得
複数食品が写った画像も自動で分離・分類（AI学習済みモデル使用）
4.3. 日々の摂取管理

一日単位のカロリー・PFCグラフ表示
食事のタイムライン表示（朝・昼・夜・間食）
目標カロリー・PFC設定（ユーザー自身が入力 or 自動推定）
前日・週単位・月単位でのレポート生成
4.4. 目標設定・通知機能

ダイエット・筋肉増量・維持の3モード
カロリー／PFC目標値の自動算出（身長・体重・年齢・活動量から）
過不足がある場合の通知アラート
食べ過ぎ／栄養バランスの偏りへのアドバイス表示
4.5. マイフード登録

よく食べるメニューを保存・再利用
自作レシピの栄養値を手動で登録可能

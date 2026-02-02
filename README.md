# Quick Link Copy - Chrome Extension

現在のページのリンクをショートカットキーで素早くクリップボードにコピーするChrome拡張機能。

## Features

| アクション | ショートカット | 出力例 |
|---|---|---|
| Markdown形式コピー | `Cmd+Shift+L` | `[Page Title](https://example.com)` |
| URLのみコピー | `Cmd+Shift+U` | `https://example.com` |
| タイトル+URL | ポップアップから | `Page Title\nhttps://example.com` |

- コピー完了時に画面右下にトースト通知
- ダークテーマのポップアップUI
- Manifest V3 対応

## Install (開発者モード)

1. このリポジトリをクローン
2. Chrome で `chrome://extensions` を開く
3. 「デベロッパーモード」を有効化
4. 「パッケージ化されていない拡張機能を読み込む」からこのディレクトリを選択

## ショートカットキーの変更

`chrome://extensions/shortcuts` でキーバインドをカスタマイズできます。

## License

MIT

# deepl-rewrite

>The only kind of writing is rewriting.
&mdash; Ernest Hemingway

A [Visual Studio Code](https://code.visualstudio.com/) extension to improve selected text using DeepL Write.

**Note**: This requires a paid [DeepL API Pro](https://www.deepl.com/en/pro#developer) subscription.

## Installation

Search for `deepl-rewrite` in the _Extensions_ section.

## Configuration

In **Settings > Extensions > DeepL Rewrite**, configure the following parameters:

- **Api Key**: Your DeepL Write API key. Requires a DeepL API Pro subscription.
- **Max Characters**: Maximum number of characters sent to DeepL for text improvement. Use this to avoid high usage-based costs.

## Usage

1. Select the text to improve. If you don't select any text, the current paragraph is selected automatically.
2. Press `Alt-Shift-R` (Windows) or `Option-Shift-R` (macOS), or execute the `Rewrite selected text` command from the command palette.<br />
   A dialog opens, allowing you to review and edit the improved text. Press Enter to confirm or Escape to cancel.
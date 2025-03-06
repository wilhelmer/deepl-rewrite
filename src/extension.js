const vscode = require('vscode');
const axios = require('axios');

async function improveText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const config = vscode.workspace.getConfiguration('deeplRewrite');
    const maxCharacters = config.get('maxCharacters', 500);
    const apiKey = config.get('apiKey', '');

    if (!apiKey) {
        vscode.window.showErrorMessage('DeepL API key is not set. Please configure it in settings.');
        return;
    }

    const document = editor.document;
    const selection = editor.selection;
    let text = document.getText(selection);
 
    if (!text.trim()) {
        vscode.window.showErrorMessage('No text selected.');
        return;
    }

    if (text.length > maxCharacters) {
        text = text.substring(0, maxCharacters);
    }

    const apiUrl = 'https://api.deepl.com/v2/write/rephrase';

    try {
        const response = await axios.post(apiUrl, {
            text: [text],
            target_lang: 'en-US'
        }, {
            headers: {
                'Authorization': `DeepL-Auth-Key ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.improvements && response.data.improvements.length > 0) {
            const improvedText = response.data.improvements[0].text;

            if (text.replace("\n", " ".trim()) === improvedText) {
                vscode.window.showErrorMessage('No improvements found.');
            }
            else {
                const userInput = await vscode.window.showInputBox({
                    prompt: 'Review and edit the improved text.',
                    value: improvedText
                });

                if (userInput !== undefined) {
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, userInput);
                    });
                }
            }
        } else {
            vscode.window.showErrorMessage('No improved text received.');
        }
    } catch (error) {
        vscode.window.showErrorMessage('Error contacting the DeepL API: ' + (error.response?.data?.message || error.message));
    }
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('deeplRewrite.improveText', improveText);
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('siko.db','default' );

type dataProps = {
  input: string,
  text: string,
  time: string
}

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mensagens (id INTEGER PRIMARY KEY AUTOINCREMENT, input TEXT, text TEXT, time DATETIME)',
        []
    );
});

// Função para inserir dados
const inserirDados = ({input, text, time} : dataProps) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO mensagens (input, text, time) VALUES (?, ?, ?)',
                [input, text, time],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

// Função para obter todos os dados
const obterTodosOsDados = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM mensagens',
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export { inserirDados, obterTodosOsDados };

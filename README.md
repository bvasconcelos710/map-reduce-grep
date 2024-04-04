## Sistema Map-Reduce e Grep

Este repositório contém um sistema de processamento de arquivos em paralelo, desenvolvido em Node.js, que utiliza a funcionalidade de worker threads para aumentar a eficiência no processamento de grandes volumes de dados. O sistema é composto por dois arquivos principais:

1. "index.js"
Responsável pela coordenação do processamento. Ele realiza as seguintes operações:

* Importa módulos necessários, incluindo fs para operações de sistema de arquivos e worker_threads para  execução de múltiplas threads de trabalho.
* Lista todos os arquivos em um diretório específico, definido pela constante FILES_OUTPUT_FOLDER.
* Para cada arquivo encontrado, inicia um worker thread utilizando o arquivo worker.js.
* Quando um worker termina o processamento, armazena o resultado e verifica se todos os workers terminaram.
* Ao final, combina os resultados dos workers e imprime o resultado final.

2. "worker.js"
Arquivo executado em uma thread de trabalho e realiza a busca por um parâmetro específico em um arquivo. Suas funcionalidades incluem:

* Importação de módulos necessários, como fs para operações de sistema de arquivos, worker_threads para comunicação com o processo pai e readline para leitura do arquivo linha por linha.
* Definição da função grep que busca por um parâmetro em um arquivo linha por linha.
* Espera por uma mensagem do processo pai que contém o nome do arquivo e o parâmetro a ser buscado.
* Quando recebe a mensagem, executa a função grep com os parâmetros fornecidos.
* Ao finalizar a busca, envia de volta ao processo pai as linhas que contêm o parâmetro.

Para executar o programa, rode o arquivo index.js seguido do parâmetro que deseja buscar, da seguinte forma:
- exemplo:
`node index.js bge`
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Milvus
from langchain.text_splitter import CharacterTextSplitter
from dotenv import load_dotenv
import os

import logging
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment variables")

def get_db():
    logging.info("Initializing database connection")
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    database = Milvus(
        embedding_function=embeddings,
        collection_name='texts',
        connection_args={
            "uri": 'https://in03-7ecec7b6315c69f.api.gcp-us-west1.zillizcloud.com',
            "user": 'db_7ecec7b6315c69f',
            "password": 'Se9?uRjVKg9mvR!7',
            "secure": True,
        },
        drop_old=False
    )
    logging.info("Successfully initialized database connection")
    return database



# print(docs[0].metadata)
# docs_page_content = "\n\n".join([d.page_content for d in docs])

# print(docs_page_content)
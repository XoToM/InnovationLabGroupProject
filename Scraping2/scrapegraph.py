from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "ollama/llama3.2",
        "model_tokens": 8192
    },
    "verbose": True,
    "headless": False,
}

smart_scraper_graph = SmartScraperGraph(
    prompt="Extract usefule information from the webpage, including what facilities the place has",
    source="https://visitbath.co.uk/food-and-drink/green-park-brasserie-p27921",
    config=graph_config
)

#query = {
 #   "title": "text",
  #  "address": "text",
   # "facilities": "text",
#}

result = smart_scraper_graph.run()

import json
print(json.dumps(result, indent=4))
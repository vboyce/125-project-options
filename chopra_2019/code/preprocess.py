import json
import pandas as pd
from argparse import ArgumentParser

parser = ArgumentParser()

parser.add_argument("filename", type=str)

RAW_DATA_FOLDER = "../data"
OUTPUT_FOLDER = "../data/pilotB"

if __name__ == "__main__":

    args = parser.parse_args()
    raw_filename = args.filename

    with open(f"{RAW_DATA_FOLDER}/{raw_filename}", "rb") as fp:
        data = json.load(fp)


    scores = []
    test_results = []
    messages = []
    prolific_ids = []
    for entry in data:
        if entry["eventType"] == "logScores":
            e = {
                "game_id": entry["gameid"],
                "role": entry["role"],
                "round_num": entry["round_num"],
                "rule_idx": entry["rule_idx"],
                "hits": entry["hits"],
                "misses": entry["misses"],
                "correct_rejections": entry["correct_rejections"],
                "false_alarms": entry["false_alarms"],
                "score": entry["score"]
            }
            scores.append(e)

        elif entry["eventType"] == "logTest":
            e = {
                "game_id": entry["gameid"],
                "role": entry["role"],
                "round_num": entry["round_num"],
                "rule_idx": entry["rule_idx"],
                "predicted_label": entry["turker_label"],
                "true_label": entry["true_label"],
                "is_correct": entry["is_correct"],
                "stim_num": entry["stim_num"]
            }
            test_results.append(e)

        elif entry["eventType"] == "chatMessage":
            e = {
                "game_id": entry["gameid"],
                "role": entry["role"],
                "round_num": entry["round_num"],
                "rule_idx": entry["rule_idx"],
                "text": entry["text"],
                "time": entry["time"]
            }
            messages.append(e)

        elif entry["eventType"] == "prolificId":
            e = {
                "game_id": entry["gameId"],
                "role": entry["role"],
                "prolific_id": entry["prolificId"]
            }
            prolific_ids.append(e)



    df_scores = pd.DataFrame(scores)
    df_test = pd.DataFrame(test_results)
    df_messages = pd.DataFrame(messages)
    df_prolific = pd.DataFrame(prolific_ids)

    df_scores.to_csv(f"{OUTPUT_FOLDER}/scores.csv")
    df_test.to_csv(f"{OUTPUT_FOLDER}/tests.csv")
    df_messages.to_csv(f"{OUTPUT_FOLDER}/messages.csv")
    df_prolific.to_csv(f"{OUTPUT_FOLDER}/prolific.csv")

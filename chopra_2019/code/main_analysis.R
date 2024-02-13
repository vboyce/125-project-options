library(tidyverse)

label_rule = function(rule_idx) {
  if (rule_idx < 10) {
    return("SINGLE_FEATURE")
  } else if (rule_idx < 20) {
    return("CONJUNCTION")
  } else if (rule_idx < 30) {
    return("DISJUNCTION")
  } else if (rule_idx < 40) {
    return("CONJUNCTION_DISJUNCTION")
  } else {
    return("DISJUNCTION_CONJUNCTION")
  }
}

df_scores <- read.csv("../data/pilotB/scores.csv")
df_tests <- read.csv("../data/pilotB/tests.csv")

explorer_tests <- df_tests |>
  filter(role == "explorer") |>
  select(game_id, role, round_num, predicted_label, rule_idx, stim_num, true_label)
colnames(explorer_tests)[4] = "explorer_pred_label"

student_tests <- df_tests |>
  filter(role == "student") |>
  select(game_id, role, round_num, predicted_label, rule_idx, stim_num)
colnames(student_tests)[4] = "student_pred_label"

combined_tests <- explorer_tests |>
  inner_join(student_tests, by=c("game_id", "round_num", "rule_idx", "stim_num")) |>
  rowwise() |>
  mutate(agree = if(student_pred_label == explorer_pred_label) 0 else 1,
         exp_correct = if(explorer_pred_label == true_label) 1 else 0,
         stud_correct = if(student_pred_label == true_label) 1 else 0,
         rule_type = label_rule(rule_idx))

hamming_distances <- combined_tests |>
  group_by(game_id, round_num, rule_type) |>
  summarize(explorer_student = sum(agree),
            explorer_accuracy = sum(exp_correct) / n(),
            student_accuracy = sum(stud_correct) / n(), .groups="keep")

ggplot(hamming_distances, aes(x=explorer_accuracy, y=explorer_student, color=rule_type, group=1)) +
  geom_point(size=3) +
  geom_smooth(method="lm", color="black") +
  labs(x="Explorer Accuracy", y="Explorer-Student Hamming Distance",
       color="Rule Type") +
  theme_minimal()

ggsave("corr_plot.png")

hamming_distances |>
  pivot_longer(c("explorer_accuracy", "student_accuracy"), names_to="role",
               values_to="accuracy") |>
  rowwise() |>
  mutate(role = if(role == "student_accuracy") "student" else "explorer") |>
  group_by(role, rule_type) |>
  summarize(mean_acc = mean(accuracy),
            ci_acc = sd(accuracy) / sqrt(n()), .groups="keep") |>
  ggplot(aes(x=rule_type, y=mean_acc, color=role, fill=role)) +
  geom_bar(stat="identity", position=position_dodge()) +
  geom_errorbar(aes(ymin = mean_acc - ci_acc/2, ymax = mean_acc + ci_acc/2),
                position=position_dodge()) +
  ylab("mean accuracy") +
  theme_minimal()

cor.test(hamming_distances$explorer_student, hamming_distances$explorer_accuracy,
         method="pearson")

ggsave("accuracy_bar_plot.png")

df_prolific = read.csv("../data/pilotB/prolific.csv")

# compute bonuses for each player
df_bonuses <- df_scores |>
  group_by(game_id) |>
  summarize(bonus_amount = (sum(score) / 2) / 100) |>
  left_join(df_prolific, by=game_id)

df_bonuses |>
  select(prolific_id, bonus_amount) |>
  write.csv("bonuses.csv")

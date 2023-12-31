const VIGNETTES= [
{item_type: "traditional", vignette: "music", text: "<p> Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Becky says that she thinks it is morally wrong to download music illegally from the Internet. Shortly after their conversation, Becky goes online, and downloads music illegally.</p>"},
{item_type: "transgressor", vignette: "music", text: "<p>Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Shortly after their conversation, Becky goes online, and downloads music illegally.</p>"},
{item_type: "honest", vignette: "music", text: "<p>Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Becky says that she thinks it is morally wrong to download music illegally from the Internet, but that she sometimes does it anyway. Shortly after their conversation, Becky goes online, and downloads music illegally.</p>"},

{item_type: "traditional", vignette: "jury", text: "Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Jennifer says that she thinks it is morally wrong to try to get out of jury duty. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it."},
{item_type: "transgressor", vignette: "jury", text: "Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it."},
{item_type: "honest", vignette: "jury", text: "Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Jennifer says that she thinks it is morally wrong to try to get out of jury duty, but that she sometimes does it anyway. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it."},

{item_type: "traditional", vignette: "phone", text: "<p> Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Bruce says that he thinks it is morally wrong to ignore your mother's phone calls. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call.</p>"},
{item_type: "transgressor", vignette: "phone", text: "<p>Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call.</p>"},
{item_type: "honest", vignette: "phone", text: "Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Bruce says that he thinks it is morally wrong to ignore your mother's phone calls, but that he sometimes does it anyway. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call."},

{item_type: "traditional", vignette: "printing", text: "Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Kevin says that he thinks it is morally wrong to use a lot of paper by printing documents single-sided. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided."},
{item_type: "transgressor", vignette: "printing", text: "Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided."},
{item_type: "honest", vignette: "printing", text: "Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Kevin says that he thinks it is morally wrong to use a lot of paper by printing documents single-sided, but that he sometimes does it anyway. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided."},
];

const QUESTIONS=[
{question: "trustworthy", vignette: "music", text: "How truthworthy do you think Becky is?", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "music", text: "How hypocritical do you think Becky is?", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "music", text: "How much do you like Becky?", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "music", text: "How honest do you think Becky is?", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "music", text: "How good a person do you think Becky is?", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "jury", text: "How truthworthy do you think Jennifer is?", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "jury", text: "How hypocritical do you think Jennifer is?", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "jury", text: "How much do you like Jennifer?", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "jury", text: "How honest do you think Jennifer is?", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "jury", text: "How good a person do you think Jennifer is?", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "phone", text: "How truthworthy do you think Bruce is?", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "phone", text: "How hypocritical do you think Bruce is?", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "phone", text: "How much do you like Bruce?", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "phone", text: "How honest do you think Bruce is?", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "phone", text: "How good a person do you think Bruce is?", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "printing", text: "How truthworthy do you think Kevin is?", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "printing", text: "How hypocritical do you think Kevin is?", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "printing", text: "How much do you like Kevin?", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "printing", text: "How honest do you think Kevin is?", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "printing", text: "How good a person do you think Kevin is?", l: "Not at all good", r: "Very good"},
]

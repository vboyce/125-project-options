const VIGNETTES= [
{item_type: "traditional", vignette: "music", text: "<p>Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Becky says that she thinks it is morally wrong to download music illegally from the Internet. Shortly after their conversation, Becky goes online, and downloads music illegally.</p><br>"},
{item_type: "transgressor", vignette: "music", text: "<p>Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Shortly after their conversation, Becky goes online, and downloads music illegally.</p><br>"},
{item_type: "honest", vignette: "music", text: "<p>Becky and her friend Amanda are discussing a mutual acquaintance. Amanda mentions that the acquaintance often downloads music illegally from the Internet. Becky says that she thinks it is morally wrong to download music illegally from the Internet, but that she sometimes does it anyway. Shortly after their conversation, Becky goes online, and downloads music illegally.</p><br>"},

{item_type: "traditional", vignette: "jury", text: "<p>Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Jennifer says that she thinks it is morally wrong to try to get out of jury duty. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it.</p>"},
{item_type: "transgressor", vignette: "jury", text: "<p>Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it.</p><br>"},
{item_type: "honest", vignette: "jury", text: "<p>Jennifer and her friend Rose are discussing a mutual acquaintance. Rose mentions that the acquaintance recently tried to get out of jury duty. Jennifer says that she thinks it is morally wrong to try to get out of jury duty, but that she sometimes does it anyway. Shortly after their conversation, Jennifer gets called for jury duty, and tries to get out of it.</p><br>"},

{item_type: "traditional", vignette: "phone", text: "<p>Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Bruce says that he thinks it is morally wrong to ignore your mother's phone calls. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call.</p><br>"},
{item_type: "transgressor", vignette: "phone", text: "<p>Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call.</p><br>"},
{item_type: "honest", vignette: "phone", text: "<p>Bruce and his friend are Zach are discussing a mutual acquaintance. Zach mentions that the acquaintance often ignores his mother's phone calls. Bruce says that he thinks it is morally wrong to ignore your mother's phone calls, but that he sometimes does it anyway. Shortly after their conversation, Bruce notices that his mother is calling, and ignores the call.</p><br>"},

{item_type: "traditional", vignette: "printing", text: "<p>Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Kevin says that he thinks it is morally wrong to use a lot of paper by printing documents single-sided. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided.</p><br>"},
{item_type: "transgressor", vignette: "printing", text: "<p>Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided.</p><br>"},
{item_type: "honest", vignette: "printing", text: "<p>Kevin and his friend Jack are discussing a mutual acquaintance. Jack mentions that the acquaintance often uses a lot of paper by printing documents single-sided. Kevin says that he thinks it is morally wrong to use a lot of paper by printing documents single-sided, but that he sometimes does it anyway. Shortly after their conversation, Kevin has a large document to print, and uses a lot of paper by printing it single-sided.</p><br>"},
];

const QUESTIONS=[
{question: "trustworthy", vignette: "music", text: "<p>How <b>trustworthy</b> do you think Becky is?</p><br>", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "music", text: "<p>How <b>hypocritical</b> do you think Becky is?</p><br>", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "music", text: "<p>How much do you <b>like</b> Becky?</p><br>", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "music", text: "<p>How <b>honest</b> do you think Becky is?</p><br>", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "music", text: "<p>How <b>good a person</b> do you think Becky is?</p><br>", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "jury", text: "<p>How <b>trustworthy</b> do you think Jennifer is?</p><br>", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "jury", text: "<p>How <b>hypocritical</b> do you think Jennifer is?</p><br>", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "jury", text: "<p>How much do you <b>like</b> Jennifer?</p><br>", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "jury", text: "<p>How <b>honest</b> do you think Jennifer is?</p><br>", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "jury", text: "<p>How <b>good a person</b> do you think Jennifer is?</p><br>", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "phone", text: "<p>How <b>trustworthy</b> do you think Bruce is?</p><br>", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "phone", text: "<p>How <b>hypocritical</b> do you think Bruce is?</p><br>", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "phone", text: "<p>How much do you <b>like</b> Bruce?</p><br>", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "phone", text: "<p>How <b>honest</b> do you think Bruce is?</p><br>", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "phone", text: "<p>How <b>good a person</b> do you think Bruce is?</p><br>", l: "Not at all good", r: "Very good"},

{question: "trustworthy", vignette: "printing", text: "<p>How <b>trustworthy</b> do you think Kevin is?</p><br>", l: "Not at all trustworthy", r: "Very trustworthy"},
{question: "hypocritical", vignette: "printing", text: "<p>How <b>hypocritical</b> do you think Kevin is?</p><br>", l: "Not at all hypocritical", r: "Very hypocritical"},
{question: "like", vignette: "printing", text: "<p>How much do you <b>like</b> Kevin?</p><br>", l: "Not at all", r: "Very much"},
{question: "honest", vignette: "printing", text: "<p>How <b>honest</b> do you think Kevin is?<p><br>", l: "Not at all honest", r: "Very honest"},
{question: "good", vignette: "printing", text: "<p>How <b>good a person</b> do you think Kevin is?</p><br>", l: "Not at all good", r: "Very good"},
]

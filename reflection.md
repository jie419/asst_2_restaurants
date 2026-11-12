# Reflection

## 1 + 2. Who is my viewer? How do I present different data by the feature of visualization

**Table: Customer** – I made this view for customers to view the inspection results of restaurants, shops, or institutions. They can also search with Cmd+F. I think even though some stores pass the inspection right now, some customers will care about their history of major violations. I tried to make the data easier to read by simplifying the result types, but I believe the history of major violations is important. So, I included the history in the table to make it transparent to readers. Also, I rearranged the results into broader categories, helping customers understand the current status easily.

**Category** – I chose to group by city, allowing customers to easily check the results in their city. Also, I would like readers to know that some cities may have a low pass rate partly because some results haven't been updated.

**Charts** – I excluded data without results because they cannot be counted as passed or not passed, and to emphasize the current inspection results. Also, I think readers will want to know what the most common violations are. So I grouped the violations into broader categories, giving readers an overall view.

## 3. Transformation

I transformed the city names. Some city names have abbreviations and mixed upper and lower case. So, I changed them to the same city name in uppercase to make the data more accurate.

## 4. Problem solved

I think a difficult part was data cleaning and reading all the data. Because I knew I wouldn't have time to put all the data into another visualization tool, I asked Claude to help with data reading. I found that 35 inspections were compliant with the 15 critical checks, but the overall results were "not passed." This confused me at first. I revealed this limitation in the description, but still provided an overall view for the public to know the possible violations.

This project also reminds me that authors do have a position. In the first chart, I made the store categories broader. However, the sample size of schools and institutions is quite small, with only 9 inspections. But I still decided to use percentages to emphasize the high failure rate because I found it serious that students or people in institutions might not have other choices for food, and all the inspections with results show that none of them passed.

## AI Acknowledgement

<!-- TODO: Write your AI acknowledgement here (ACM format, see syllabus) -->

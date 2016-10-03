#User Stories#

##Market Research Team##
Gender: 3 Male 3 Female
Occupation: Market Research team and manager
Web Use: Use the Table/Chart/results to analyze data and decide what is a suitable product. 6.5hrs/day 7 days/week
Income: $60-125k
Age: 27 - 55
Why: Want to make $$$$$$

##Developer##
Gender: Male
Occupation: Web Developer
Web Use: Test to make sure each function works and that the site displays as intended 24/7
Income: Pro bono
Age: 28
Why: tax write-off

##Focus Group Participants##
Gender: 2 Male 2 Female
Occupation: Amazon security, Microsoft engineer, Dept of Agriculture Paper Pusher, Construction Worker
Web Use: 2-9 hours/day 7 days/week
Income: $28k-100k
Age: 22 - 62
Why: Bribed with food and drink

#Tech Plan#
##Display 3 random files##
Vars to track total clicks (var imgClicksTotal = 0), total number of times images have been displayed)(var imgDisplayCount = 0),
Create object to assign to imgs with properties (this.name, this.path, this.clickTrack, this.displayCount, setAttribute(id, this.name);  )
create local vars within object for click tracking (this.clickTrack), display count (this.displayCount), total clicks (this.totalClicks)
Event handler for clicking on the image that increments each of the above (if totalClicks === 25, removeEventHandler)

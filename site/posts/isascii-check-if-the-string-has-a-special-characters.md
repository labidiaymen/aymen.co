---
title: "(C++) isASCII(string) : Check if the string has a special characters"
date: 2020-03-02
categories: ["c-plus-plus"]
cover: "/images/Avengers-ASCII-Logo.jpg"
permalink: "/c-plus-plus/isascii-check-if-the-string-has-a-special-characters/"
---

When using C++ to serve **multi-languages** users, we need to validate the caractères in the string to find out what to do.

In our case, we need to find out if there's a special character in the string to convert them,  and this was made by checking the decimal code of each character and check if it is above 127 or not,

why **127**?

Because the **ASCII** table told us that the characters code starts from 0 (NULL) and ends at 127(DEL)

![](/images/asciifull.gif)

So we made this function.

bool isASCII(const std::string& s)
{
	return !std::any\_of(s.begin(), s.end(), \[\](char c) {
		return static\_cast<unsigned char>(c) > 127;
	});
}

And this how we used it

 

#include <iostream>
#include <string>
#include <algorithm> 

bool isASCII(const std::string& s)
{
	return !std::any\_of(s.begin(), s.end(), \[\](char c) {
		return static\_cast<unsigned char>(c) > 127;
	});
}

int main(){
	std::string testString = "not a valid Ãscii";
    std::cout << "Is valid ASCII " << isASCII(testString.c\_str()) << std::endl;
}

And the output will be:

Is valid ASCII 0

0 as NULL is C++

 

PS: Will share snippets as I'm learning C++

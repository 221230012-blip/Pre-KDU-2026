password1 = input("Enter password: ")
password2 = input("Confirm password: ")

length1 = len(password1)
length2 = len(password2)

print("Length 1:", length1)
print("Length 2:", length2)

lengths_match = (length1 == length2)
print("Lengths match:", lengths_match)

strings_match = (password1 == password2)
print("Strings match:", strings_match)

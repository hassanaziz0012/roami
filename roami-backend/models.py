# from django.contrib.auth.base_user import BaseUserManager
# from django.contrib.auth.validators import UnicodeUsernameValidator
# from django.db import models
# from django.contrib.auth.models import AbstractUser
#
#
# # Custom User Manager for email field login
#
#
# class Follower(models.Model):
#     follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)
#     followed = models.ForeignKey(User, related_name='followed_user', on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = ('follower', 'followed')
#
#     def __str__(self):
#         return f"{self.follower.username} is following {self.followed.username}"
#
#
# class Invite(models.Model):
#     inviter = models.ForeignKey(User, related_name='inviting_user', on_delete=models.CASCADE)
#     invited = models.ForeignKey(User, related_name='invited_user', on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = ('inviter', 'invited')
#
#     def __str__(self):
#         return f"{self.inviter.username} invited {self.invited.username}"
#
#
# class Interest(models.Model):
#     name = models.CharField(max_length=100)
#
#     def __str__(self):
#         return f"Interst: {self.name}"
#
#
# class User_Interests(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     interest = models.ForeignKey(Interest, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return f"{self.user.username} is interested in {self.interest.name}"
#
#
# class List(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     link = models.URLField()
#     description = models.TextField()
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     downloads = models.IntegerField()
#
#     def __str__(self):
#         return f"{self.name} was uploaded by {self.user.username}"
#
#
# class Follower_List(models.Model):
#     list = models.ForeignKey(List, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = ('list', 'user')
#
#     def __str__(self):
#         return f"{self.user.username} is following {self.list.name}"
#
#
# class Location(models.Model):
#     list = models.ForeignKey(List, on_delete=models.CASCADE)
#     country = models.CharField(max_length=100)
#     city = models.CharField(max_length=100)
#
#     def __str__(self):
#         return f"{self.list.name} has places from {self.city}, {self.country}"
#
#
# class Tag(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#
#     def __str__(self):
#         return f"Tag: {self.name}"
#
#
# class List_Tags(models.Model):
#     list = models.ForeignKey(List, on_delete=models.CASCADE)
#     tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = ('list', 'tag')
#
#     def __str__(self):
#         return f"{self.list.name} includes {self.tag.name} places"
#
#
# class Media(models.Model):
#     list = models.ForeignKey(List, on_delete=models.CASCADE)
#     file = models.FileField(upload_to='list_media_files/')
#     position = models.IntegerField()
#
#
# class Review(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     list = models.ForeignKey(List, on_delete=models.CASCADE)
#     date = models.DateTimeField(auto_now_add=True)
#     rating = models.IntegerField()
#     text = models.TextField(blank=True)
#
#     class Meta:
#         unique_together = ('user', 'list')
#
#     def __str__(self):
#         return f"{self.user.username} reviewed {self.list.name} with a rating of {self.rating}"

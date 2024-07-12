### to-do:
1. rate-limiting: unreliable from the state 
2. summary page - api call 
3. logs/auth

### EAS commands
- eas build -p ios --profile preview
- npx expo prebuild --clean
- npx expo run:android && npx expo run:ios

### link commands
npx expo-modules-autolinking search  
npx expo-modules-autolinking resolve --platform ios
npx expo-modules-autolinking verify 

### clear cache
npm start -c 
eas build:clear-cache

### before pushing up, to delete the secret accidentally included 
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch path/to/secret' HEAD

### git revert 
git revert HEAD   git revert <commit-hash>

### squash commits
git rebase -i HEAD~<number>

pick abcdef1 Commit message 1
squash abcdef2 Commit message 2
squash abcdef3 Commit message 3

 press Esc, then type :wq and press Enter for Vim, or Ctrl-X then Y for Nano.

 ### files needed 
 ./sentryclirc for sentry
 eas.json for eas build
 




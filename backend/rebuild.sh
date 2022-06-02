cd ../lunch-uc 
echo "rebuilding react app"
npm run build
cd ../lunch-uc-backend
rm -r public
mv ../lunch-uc/build public



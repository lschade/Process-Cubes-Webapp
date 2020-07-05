find . -type f -name 'vgroup*' | while read FILE ; do
    newfile="$(echo ${FILE} |sed -e 's/vgroup/attributeValue/')" ;
    mv "${FILE}" "${newfile}" ;
done 